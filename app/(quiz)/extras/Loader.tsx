import CircularProgress from "@mui/material/CircularProgress";

interface LoaderProps {
  smaller?: boolean;
}

export default function Loader({ smaller = false }: LoaderProps) {
  return (
    <div
      className={`${
        smaller ? "min-h-[50dvh]" : "min-h-[85dvh]"
      } flex place-items-center justify-center`}
    >
      <CircularProgress color="info" />
    </div>
  );
}
