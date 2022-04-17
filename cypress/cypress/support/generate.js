import { build, fake } from "test-data-bot";

const buildUser = build("User").fields({
  username: fake((f) => f.internet.userName()),
  password: fake((f) => f.internet.password()),
  firstName: fake((f) => f.name.firstName()),
  lastName: fake((f) => f.name.lastName()),
});

export { buildUser };
