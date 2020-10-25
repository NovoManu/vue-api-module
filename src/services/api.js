class BaseApiService {
  // Note: you may want to store this info in .env file
  baseUrl = "https://jsonplaceholder.typicode.com";
  resource;

  constructor(resource) {
    if (!resource) throw new Error("Resource is not provided");
    this.resource = resource;
  }

  getUrl(id = "") {
    return `${this.baseUrl}/${this.resource}/${id}`;
  }

  handleErrors(err) {
    // Note: here you may want to add your errors handling
    console.log({ message: "Errors is handled here", err });
  }
}

class ReadOnlyApiService extends BaseApiService {
  constructor(resource) {
    super(resource);
  }
  async fetch(config = {}) {
    // Note: read more about fetch API here: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    try {
      const response = await fetch(this.getUrl(), config);
      return await response.json();
    } catch (err) {
      this.handleErrors(err);
    }
  }
  async get(id) {
    try {
      if (!id) throw Error("Id is not provided");
      const response = await fetch(this.getUrl(id));
      return await response.json();
    } catch (err) {
      this.handleErrors(err);
    }
  }
}

class ModelApiService extends ReadOnlyApiService {
  constructor(resource) {
    super(resource);
  }
  async post(data = {}) {
    try {
      const response = await fetch(this.getUrl(), {
        method: "POST",
        body: JSON.stringify(data)
      });
      const { id } = response.json();
      return id;
    } catch (err) {
      this.handleErrors(err);
    }
  }
  async put(id, data = {}) {
    if (!id) throw Error("Id is not provided");
    try {
      const response = await fetch(this.getUrl(id), {
        method: "PUT",
        body: JSON.stringify(data)
      });
      const { id: responseId } = response.json();
      return responseId;
    } catch (err) {
      this.handleErrors(err);
    }
  }
  async delete(id) {
    if (!id) throw Error("Id is not provided");
    try {
      await fetch(this.getUrl(id), {
        method: "DELETE"
      });
      return true;
    } catch (err) {
      this.handleErrors(err);
    }
  }
}

class UsersApiService extends ReadOnlyApiService {
  constructor() {
    super("users");
  }
}

class PostsApiService extends ModelApiService {
  constructor() {
    super("posts");
  }
}

class AlbumsApiService extends ModelApiService {
  constructor() {
    super("albums");
  }
  async uploadImage() {
    /*
    Here you create you images uploading logic
    Unfortunately, jsonplaceholder don't provide url to upload files
     */
    console.log({ message: "Image has been uploaded successfully!" });
    return true;
  }

  async triggerError() {
    try {
      throw Error("This error is triggered and handled by api module");
    } catch (err) {
      this.handleErrors(err);
    }
  }
}

export const $api = {
  users: new UsersApiService(),
  posts: new PostsApiService(),
  albums: new AlbumsApiService()
};
