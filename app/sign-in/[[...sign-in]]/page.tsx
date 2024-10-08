import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return  <section className="flex justify-center items-center py-16"><SignIn /> </section>
}