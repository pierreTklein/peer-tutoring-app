import { LOCAL_API_URL, PROD_API_URL } from "../config";
import Endpoint from "./endpoint";
/**
 * Inspired by https://github.com/FrancescoSaverioZuppichini/API-Class
 */

class API {
  private url: string;
  private endpoints: { [id: string]: Endpoint } = {};

  constructor(url: string) {
    this.url = url;
    this.endpoints = {};
  }
  /**
   * Create and store a single entity's endpoints
   * @param {string} name name of the resource
   */
  public createEntity(name: string, resourceKey?: string): void {
    this.endpoints[name] = this.createBasicCRUDEndpoints(name, resourceKey);
  }
  /**
   * Create and store multiple entities' endpoints.
   * @param arrayOfEntity names of the resources.
   */
  public createEntities(arrayOfEntity: string[], resourceKey?: string[]): void {
    if (resourceKey) {
      arrayOfEntity.forEach((value, index) =>
        this.createEntity(value, resourceKey[index])
      );
    } else {
      arrayOfEntity.forEach(value => this.createEntity(value));
    }
  }
  /**
   * Get the endpoint object as created by the name
   * @param {String} name name of the entity
   */
  public getEndpoint(name: string): Endpoint {
    return this.endpoints[name];
  }
  /**
   * Create the basic endpoints handlers for CRUD operations
   */
  private createBasicCRUDEndpoints(
    name: string,
    resourceKey?: string
  ): Endpoint {
    const endpoints = new Endpoint(name, `${this.url}/${name}`, resourceKey);
    return endpoints;
  }
}

let API_URL;
if (
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1" ||
  location.hostname === ""
) {
  API_URL = LOCAL_API_URL;
} else {
  API_URL = PROD_API_URL;
}

export default new API(API_URL);