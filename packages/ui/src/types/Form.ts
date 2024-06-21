import {
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form"

export type HandleErrorMessage<TFieldValues extends FieldValues> = (
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>,
  error: FieldErrors<TFieldValues>,
) => string
