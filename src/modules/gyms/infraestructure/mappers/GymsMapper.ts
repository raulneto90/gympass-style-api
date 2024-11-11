import { Gym } from '../../domain/entities/Gym';

type GymProps = Gym;

export class GymsMapper {
	static toDomain(props: GymProps): Gym {
		return new Gym(props);
	}
}
