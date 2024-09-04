import {Button} from "@/components/ui/button";
import { ButtonProp } from "../form/ButtonProp";
const AuthProvider = () => {
  return (
    <div className="flex flex-col">
        <ButtonProp className="mt-8 rounded-full" variant='default'size="lg" text='Sign in with Google'/>
    </div>
  )
}

export default AuthProvider