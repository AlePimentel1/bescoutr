import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const completeProfileSchema = z.object({
    accountType: z.enum(["fan", "scoutr"]),
    favouriteLeagues: z.array(z.string()),
    favouriteTeams: z.array(z.string()),
    favouritePlayers: z.array(z.string()),
    favouriteScouters: z.array(z.string()),
})
export const completeProfileDefaultValues: CompleteProfileSchemaType = {
    accountType: "fan",
    favouriteLeagues: [],
    favouriteTeams: [],
    favouritePlayers: [],
    favouriteScouters: [],
}
export type CompleteProfileSchemaType = z.infer<typeof completeProfileSchema>
export type CompleteProfileFormType = UseFormReturn<z.infer<typeof completeProfileSchema>>