import Image from 'next/image';
import { SignUp } from '@clerk/nextjs';

export default function SignupPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[80vh] flex items-center py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
        <div className="hidden md:block">
          <Image
            src="/images/Side Image.png"
            alt="Shopping"
            width={600}
            height={600}
            className="object-contain rounded-lg"
          />
        </div>

        <div className="flex justify-center">
          <SignUp
            path="/signup"
            routing="path"
            signInUrl="/login"
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-red-500 hover:bg-red-600 text-white text-sm normal-case',
                card: 'shadow-none',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
