import { BadRequestException, PipeTransform } from "../nest-shim";
import { ZodTypeAny } from "zod";

export class ZodValidationPipe<TSchema extends ZodTypeAny>
  implements PipeTransform
{
  constructor(private readonly schema: TSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: "validacao zod falhou",
        issues: result.error.issues,
      });
    }

    return result.data;
  }
}
