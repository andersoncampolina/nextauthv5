import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
    try {
        const account = await db.account.findFirst({
            where: { userId }
        });

        return account;
    } catch {
        return null;
    }
};

export const deleteAccountByUserId = async (userId: string) => {
    try {
        await db.account.delete({
            where: { userId }
        });

        return true;
    } catch {
        return false;
    }
}