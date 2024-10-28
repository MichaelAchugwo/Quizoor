import Link from "next/link";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

export default function Home() {
  return (
    <>
      <div className="md:text-center text-2xl z-1 relative px-[50px] mt-10 flex place-items-center justify-center min-h-[65dvh]">
        <div className="flex text-center flex-col gap-y-5 mt-5">
          <p>
            We&apos;d love to hear from you! Whether you have questions,
            feedback, or need support with Quizoor, feel free to get in touch.
          </p>
          <Link href="mailto:mail.quizoor.com">
            <MailOutlineIcon className="mr-2" />
            mail.quizoor.com
          </Link>
          <Link href="tel:+2348135043731">
            <ContactPhoneIcon className="mr-2" />
            +234 813 504 3731
          </Link>
        </div>
      </div>
    </>
  );
}
