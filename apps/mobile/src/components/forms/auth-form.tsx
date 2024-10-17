import { Link } from "expo-router"
import type { ComponentProps } from "react"
import type { Control } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { TouchableOpacity, View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Button, type ButtonProps } from "@/components/ui/button"
import FormField from "@/components/ui/input/form-field"
import { Text } from "@/components/ui/text"

type SignIn = {
  email: string
  password: string
}
type SignUp = SignIn & { username: string }
type BaseControl = Control<SignIn | SignUp>

type Props = { onSubmit: ButtonProps["onPress"] } & Pick<
  ComponentProps<typeof Button>,
  "isLoading"
> &
  (
    | {
        authType: "signIn"
        control: Control<SignIn>
      }
    | {
        authType: "signUp"
        control: Control<SignUp>
      }
  )

const AuthForm = ({ onSubmit, authType, control, isLoading }: Props) => {
  const { tw } = useTheme()
  const { t } = useTranslation()
  const isSignIn = authType === "signIn"

  return (
    <View style={tw.style("flex-1 gap-12 p-8")}>
      <View style={tw.style("gap-3 items-center mt-20")}>
        <Text style={tw.style("text-2xl font-semibold")}>
          {t(`forms.${authType}.title`)}
        </Text>
        <Text style={tw.style("font-medium text-foreground/50")}>
          {t(`forms.${authType}.description`)}
        </Text>
      </View>
      <View style={tw.style("gap-4 items-center justify-center")}>
        {authType === "signUp" && (
          <FormField
            control={control}
            name={"username"}
            placeholder={t("forms.username")}
            autoComplete="username"
            autoCapitalize="none"
          />
        )}
        <FormField
          control={control as BaseControl}
          name={"email"}
          placeholder={t("forms.email")}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
        />
        <FormField
          control={control as BaseControl}
          placeholder={t("forms.password")}
          isPassword
          name="password"
        />

        <Button onPress={onSubmit} isText isFullWidth isLoading={isLoading}>
          {t(`forms.${authType}.submit`)}
        </Button>
      </View>

      <View
        style={tw.style("flex-row gap-1 flex-1 items-end justify-center pb-4")}
      >
        <Text>
          {isSignIn
            ? t("forms.signIn.dontHaveAccount")
            : t("forms.signUp.alreadyHaveAccount")}
        </Text>
        <Link href={isSignIn ? "/sign-up" : "/sign-in"} asChild>
          <TouchableOpacity>
            <Text color="primary">
              {t(`forms.${isSignIn ? "signUp" : "signIn"}.title`)}
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default AuthForm
