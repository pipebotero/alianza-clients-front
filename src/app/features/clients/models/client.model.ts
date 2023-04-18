import { IDeserializable } from "src/app/shared/models/deserializable.model";

export class Client implements IDeserializable {
    username: string;
    name: string;
    email: string;
    phone: string;
    createdAt?: string;
    updatedAt?: string;

    public deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}