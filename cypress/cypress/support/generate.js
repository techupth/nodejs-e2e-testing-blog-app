import { build, fake, oneOf } from "test-data-bot";

const buildUser = build("User").fields({
  username: fake((f) => f.internet.userName()),
  password: fake((f) => f.internet.password()),
  firstName: fake((f) => f.name.firstName()),
  lastName: fake((f) => f.name.lastName()),
});

const buildPost = build("Post").fields({
  title: fake((f) => f.lorem.sentence(1)),
  content: fake((f) => f.lorem.sentence(5)),
  status: oneOf("published", "draft", "archived"),
});

export { buildUser, buildPost };
