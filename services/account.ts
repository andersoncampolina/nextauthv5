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
        const account = await db.account.findFirst({
            where: { userId }
        });
        await db.account.delete({
            where: { id: account?.id }
        });

        return true;
    } catch {
        return false;
    }
}