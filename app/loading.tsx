import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
    return(
        <div className="min-h-[75dvh] min-w-[75dvw] flex place-items-center justify-center">
            <CircularProgress color="info" />
        </div>
    )
}