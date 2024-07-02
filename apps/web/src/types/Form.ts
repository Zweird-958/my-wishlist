import type {
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form"

export type GetErrorMessage<TFieldValues extends FieldValues> = (
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>,
  error: FieldErrors<TFieldValues>,
) => string
