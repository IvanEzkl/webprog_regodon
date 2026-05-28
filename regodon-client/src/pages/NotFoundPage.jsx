import Button from '../components/Button';

const Retro404Illustration = () => {
    return (
        <svg viewBox="0 0 440 340" className="h-auto w-full max-w-[430px]" aria-hidden="true">
            <path
                d="M92 232c0-24 21-39 35-47c6-22 26-38 55-38c23 0 43 10 57 27c10-6 22-10 36-10c38 0 69 26 69 60c0 30-24 54-56 54H154c-36 0-62-20-62-46z"
                fill="#d8c7ef"
            />

            <g stroke="#0f2c21" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M153 191c-19 16-27 37-18 78" />
                <path d="M169 184c-7 33-2 57 14 84" />

                <path d="M192 248c28 18 64 20 104 5" />
                <path d="M220 219c16 23 39 32 76 33" />

                <rect x="138" y="188" width="92" height="92" rx="26" fill="#f6f6f2" />
                <path d="M149 218h71" stroke="#f4b11f" strokeWidth="5" />
                <path d="M149 237h71" stroke="#f4b11f" strokeWidth="5" />

                <circle cx="197" cy="145" r="58" fill="#f6f6f2" />
                <circle cx="197" cy="145" r="37" fill="#f6f6f2" />
                <circle cx="186" cy="138" r="3" fill="#0f2c21" stroke="none" />
                <path d="M188 162c8 8 22 10 33 3" />

                <path d="M156 110c5-15 15-23 31-26" />
                <path d="M171 105l11-12" />
                <path d="M188 102l12-14" />

                <path d="M134 100c-13 2-22 8-30 18" />
                <path d="M114 108l-8 12" />

                <circle cx="201" cy="146" r="52" />

                <path d="M244 173l63 28" />
                <path d="M223 177l60 26" />
                <path d="M280 204l16 6" />

                <path d="M301 188l26 2" />
                <path d="M326 190c16 2 27 13 25 26c-2 13-14 21-30 19" />
                <path d="M318 233c-8-7-10-20-2-28" />

                <circle cx="199" cy="145" r="21" fill="#ffffff" />
                <circle cx="199" cy="145" r="12" fill="#1f2430" />
                <circle cx="199" cy="145" r="8" fill="#0f1219" />
                <circle cx="203" cy="141" r="2" fill="#ffffff" stroke="none" />
            </g>
        </svg>
    );
};

function NotFoundPage() {
    return (
        <div className="flex min-h-[68vh] w-full items-center">
            <section className="w-full bg-[var(--bg-surface)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="flex justify-center lg:justify-start">
                        <div className="w-full max-w-[410px]">
                            <Retro404Illustration />
                        </div>
                    </div>

                    <div className="text-left lg:max-w-md">
                        <h1 className="text-5xl font-black leading-tight text-[var(--ink-900)] sm:text-6xl">
                            Oops!
                        </h1>
                        <p className="mt-4 text-xl font-semibold leading-tight text-[var(--ink-700)] sm:text-2xl">
                            We couldn't find the page you were looking for.
                        </p>

                        <div className="mt-8">
                            <Button to="/articles" variant="primary" className="border-[var(--ink-900)] px-6">
                                Go Back to Articles
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default NotFoundPage;