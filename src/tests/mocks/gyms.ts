import { Gym } from '@src/modules/gyms/domain/entities/Gym';

export function makeGym(props?: Partial<Gym>): Gym {
	return {
		id: props?.id ?? 'gym-01',
		title: props?.title ?? 'Academia Teste',
		description: props?.description ?? 'Academia Teste',
		latitude: props?.latitude ?? -23.5505199,
		longitude: props?.longitude ?? -46.6333094,
		phone: props?.phone ?? '11999999999',
	};
}
