import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: "users",
    auth: {
        verify:{
            generateEmailHTML: ({token}) => {
                return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify Account</a>`;
            },
        },
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
    fields: [
        {
            name: "role",
            defaultValue: "user",
            required: true,
            type: "select",
            options: [
                {
                    label: "Admin",
                    value: "admin",
                },
                {
                    label: "User",
                    value: "user",
                },
            ]
        },
        {
        name: 'firstName',
        type: 'text',
        },
        {
        name: 'surname',
        type: 'text',
        },
        {
            name: 'phoneNumber',
            type: 'text',
        }
    ]
}