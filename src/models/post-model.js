let posts = [
  {
    id: Date.now(),
    title: "Angular",
    desc: "Mi App",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FAngular_%2528framework%2529&psig=AOvVaw3ii10AX-ihZ0-8mKjmkj9B&ust=1700845258205000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNDrzLzM2oIDFQAAAAAdAAAAABAI",
  },
];

// !CREAR
const createNewPost = ({ title, desc, image }) => {
  if (!title) return null;

  const newPost = { id: Date.now(), title, desc, image };

  posts.push(newPost);

  return newPost;
};

//!VER TODOS LOS POSTS
const getAllPosts = () => {
  return [...posts];
};

// !OBTENER 1 POST POR EL ID
const getPostById = ({ id }) => {
  const post = posts.find((post) => post.id === id);

  return post;
};

// !EDITAR
const findPostByIdAndUpdate = (id, data) => {
  const post = getPostById({ id });
  if (!post) return null;

  posts = posts.map((post) => {
    if (post.id === id) {

      if (data.title) post.title = data.title
      if (data.desc) post.desc = data.desc
      if (data.image) post.image = data.image

      return post

    }
    return post;
  });

  return {
    ...post,
    ...data,
  };
};

// !ELIMINAR
const deletePostById = ({ id }) => {
  posts = posts.filter((post) => post.id !== id);
};

export const postModel = {
  findAll: getAllPosts,
  create: createNewPost,
  findOne: getPostById,
  update: findPostByIdAndUpdate,
  destroy: deletePostById,
};
