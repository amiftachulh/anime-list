import { AxiosError } from "axios";
import { useRouteError } from "react-router-dom"

export default function AnimeError() {
  const error = useRouteError() as AxiosError;

  return (
    <div className="flex flex-col justify-center items-center h-[500px]">
      <div className="font-bold text-3xl">
        {error.response?.status}
      </div>
      <p>{error.response?.statusText}</p>
    </div>
  )
}
