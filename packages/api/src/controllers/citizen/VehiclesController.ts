import { User } from ".prisma/client";
import { validate, VEHICLE_SCHEMA } from "@snailycad/schemas";
import { UseBeforeEach, Context, BodyParams } from "@tsed/common";
import { Controller } from "@tsed/di";
import { BadRequest, NotFound } from "@tsed/exceptions";
import { JsonRequestBody, Post } from "@tsed/schema";
import { prisma } from "../../lib/prisma";
import { IsAuth } from "../../middlewares/IsAuth";
import { generateString } from "../../utils/generateString";

@Controller("/vehicles")
@UseBeforeEach(IsAuth)
export class VehiclesController {
  @Post("/")
  async registerVehicle(@Context() ctx: Context, @BodyParams() body: JsonRequestBody) {
    const error = validate(VEHICLE_SCHEMA, body.toJSON(), true);
    const user = ctx.get("user") as User;

    if (error) {
      return new BadRequest(error);
    }

    const citizen = await prisma.citizen.findUnique({
      where: {
        id: body.get("citizenId"),
      },
    });

    console.log({ citizen });

    if (!citizen || citizen.userId !== user.id) {
      throw new NotFound("Citizen not found");
    }

    const existing = await prisma.registeredVehicle.findUnique({
      where: {
        plate: body.get("plate"),
      },
    });

    if (existing) {
      throw new BadRequest("Vehicle with that plate already exists");
    }

    const vehicle = await prisma.registeredVehicle.create({
      data: {
        plate: body.get("plate"),
        color: body.get("color"),
        citizenId: citizen.id,
        model: body.get("model"),
        registrationStatus: body.get("registrationStatus"),
        // todo
        insuranceStatus: "TEST",
        vinNumber: generateString(17),
        userId: user.id,
      },
    });

    return vehicle;
  }
}