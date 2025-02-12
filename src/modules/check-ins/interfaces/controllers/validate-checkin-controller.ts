import { FastifyReply, FastifyRequest } from 'fastify';
import {
	createCheckinParamsSchema,
	createCheckinSchema,
} from '../../dtos/create-checkin-dto';
import { validateCheckinParamsSchema } from '../../dtos/validate-checkin-dto';
import { makeCreateCheckinsUseCase } from '../../factories/make-create-check-ins-use-case';
import { makeValidateCheckInUseCase } from '../../factories/make-validate-check-in-use-case';

export class ValidateCheckinController {
	async handle(request: FastifyRequest, reply: FastifyReply) {
		const { checkinId } = validateCheckinParamsSchema.parse(request.params);

		const validateCheckinUseCase = makeValidateCheckInUseCase();

		await validateCheckinUseCase.execute({
			checkinId,
		});

		return reply.status(204).send();
	}
}
