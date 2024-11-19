/* eslint-disable max-lines */
import type * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { useTranslation } from "@ui/components/AppContext"
import { Input, type InputProps } from "@ui/components/ui/input"
import { Label } from "@ui/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select"
import { cn } from "@ui/utils/ui"
import * as React from "react"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)

export type FormFieldProps = React.ComponentProps<typeof FormField>

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("w-full space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-danger", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={Boolean(error)}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-muted-foreground text-[0.8rem]", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, name, formMessageId } = useFormField()
  const { t } = useTranslation("zodErrors")
  const body = error ? String(t(`${name}.${error.message}`)) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-danger text-sm font-medium", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export type FormInputProps = {
  label?: string
  description?: string
  name: FormFieldProps["name"]
  formProps?: Omit<FormFieldProps, "render" | "name">
} & InputProps

const FormInput = ({
  name,
  label,
  description,
  formProps,
  ...inputProps
}: FormInputProps) => (
  <FormField
    name={name}
    {...formProps}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input {...inputProps} {...field} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)
FormInput.displayName = "FormInput"

export type FormSelectProps = {
  label?: string
  description?: string
  name: FormFieldProps["name"]
  formProps?: Omit<FormFieldProps, "render" | "name">
  options: string[]
  triggerProps?: React.ComponentProps<typeof SelectTrigger>
  valueProps?: React.ComponentProps<typeof SelectValue>
  contentProps?: React.ComponentProps<typeof SelectContent>
  itemProps?: Omit<React.ComponentProps<typeof SelectItem>, "value">
}

const FormSelect = ({
  name,
  label,
  description,
  options,
  formProps,
  contentProps,
  itemProps,
  triggerProps,
  valueProps,
}: FormSelectProps) => (
  <FormField
    name={name}
    {...formProps}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <Select
          onValueChange={field.onChange}
          defaultValue={
            typeof field.value !== "string"
              ? (field.value as number).toString()
              : field.value
          }
        >
          <FormControl>
            <SelectTrigger {...triggerProps}>
              <SelectValue {...valueProps} />
            </SelectTrigger>
          </FormControl>
          <SelectContent {...contentProps}>
            {options.map((option) => (
              <SelectItem value={option} key={option} {...itemProps}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
  FormSelect,
}
