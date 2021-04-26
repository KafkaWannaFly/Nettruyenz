import faker from "faker";
import bcrypt from "bcrypt";
import { User, UserLevel, userModel } from "../models/UserModel";
import { SALT } from "../constants/EnvironmentConstants";

const saltRound = SALT;
const normalUserNumber = 20;
const defaultPassword = "123";

async function createFakeUsers(number: number, defaultPass: string) {
	let users: User[] = [];
	for (let i = 0; i < number; i++) {
		let user: User = {
			email: faker.internet.email(),
			password: await bcrypt.hash(defaultPass, saltRound),
			nickname: `${faker.name.firstName()} ${faker.name.lastName()}`,
			avatar: faker.image.imageUrl(),
			level: UserLevel.normal,
		};

		users.push(user);
	}

	return users;
}

try {
	createFakeUsers(normalUserNumber, defaultPassword).then(async (users) => {
		// Create a boss
		let mod: User = {
			email: "18127084@student.hcmus.edu.vn",
			password: await bcrypt.hash(defaultPassword, saltRound),
			nickname: "Kafka Wanna Fly",
			level: UserLevel.moderator,
			avatar:
				"https://en.gravatar.com/userimage/160211096/bb2f6fdf53965cbc01bb4c2f7e8c320d.jpg?size=200",
		};

		users.push(mod);
		console.log(users);

		await userModel.insertMany(users as any);
		console.log(`Insert ${users.length} into DB`);
	});
} catch (error) {
	console.error(error);
}
