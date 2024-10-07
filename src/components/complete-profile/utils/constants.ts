import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const completeProfileSchema = z.object({
    accountType: z.enum(["fan", "scout"]),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    country: z.string(),
    favouriteLeagues: z.array(z.string()),
    favouriteTeams: z.array(z.string()),
    favouritePlayers: z.array(z.string()),
    favouriteScouters: z.array(z.string()),
})
export const completeProfileDefaultValues: CompleteProfileSchemaType = {
    accountType: "fan",
    firstName: "",
    lastName: "",
    username: "",
    country: "",
    favouriteLeagues: [],
    favouriteTeams: [],
    favouritePlayers: [],
    favouriteScouters: [],
}
export type CompleteProfileSchemaType = z.infer<typeof completeProfileSchema>
export type CompleteProfileFormType = UseFormReturn<z.infer<typeof completeProfileSchema>>