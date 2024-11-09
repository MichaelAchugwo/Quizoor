import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
    return(
        <div className="min-h-[85dvh] min-w-[100dvw] flex place-items-center justify-center">
            <CircularProgress color="info" />
        </div>
    )
}