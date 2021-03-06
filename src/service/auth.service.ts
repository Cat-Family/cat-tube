import { DocumentType } from "@typegoose/typegoose";
import { Session } from "../model/session.models";
import { omit } from "lodash";
import { _PrivateFields, privateFields, User } from "../model/user.model";
import { signJwt } from "../utils/jwt";
import { FilterQuery, QueryOptions } from "mongoose";
import { SessionModel } from "../model";

export const createSession = async ({ userId }: { userId: string }) => {
    return SessionModel.create({ user: userId })
}

export const findSessionById = async (id: string) => {
    return SessionModel.findById(id);
}

export async function signRefreshToken({ userId }: { userId: string }) {
    const session = await createSession({
        userId
    });

    return signJwt(
        { session: session._id },
        "refreshTokenPrivateKey",
        {
            expiresIn: "30d"
        }
    );
}

export function signAccessToken(user: DocumentType<User>) {
    const payload = omit(user.toJSON(), privateFields);

    return signJwt(payload, "accessTokenPrivateKey", {
        expiresIn: "15m"
    });
}

export const findSessions = async (
    query: FilterQuery<Session>,
    options: QueryOptions = { lean: true }
) => {
    return SessionModel.find(query, {}, options).populate('user', _PrivateFields);
};