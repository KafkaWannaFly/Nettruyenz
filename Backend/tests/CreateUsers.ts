import faker from "faker";
import bcrypt from "bcrypt";
import { User, UserLevel, UserModel } from "../models/UserModel";

const saltRound = 10;
const normalUserNumber = 20;
const defaultPassword = "meowmeow";

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

		// await UserModel.insertMany(users);
		// console.log(`Insert ${users.length} into DB`);
	});
} catch (error) {
	console.error(error);
}
