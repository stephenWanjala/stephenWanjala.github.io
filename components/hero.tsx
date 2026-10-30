import Image from 'next/image'
import { ButtonLink, ExternalButton, Container } from './ui'
import { ArrowRightIcon, DownloadIcon } from './icons'

export function Hero() {
  return (
    <section className="border-b-2 border-line-strong">
      <Container className="py-10 md:py-16">
        <div className="grid md:grid-cols-[1fr_20rem] lg:grid-cols-[1fr_24rem] gap-10 md:gap-14 items-center">
          <div>
            <h1 className="text-mega text-fg">
              Stephen Wanjala<span className="text-blue-60">.</span>
            </h1>

            <p className="mt-6 text-heading-03 md:text-heading-04 text-fg max-w-2xl text-pretty">
              I&apos;m a software developer in Kenya. At PrimeSoft I maintain the HR and
              Payroll and Sacco systems inside the MaliPlus ERP, mostly Java and JavaFX.
              Outside work I build Android and Compose apps.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects" icon={<ArrowRightIcon />} className="min-w-52">
                See my projects
              </ButtonLink>
              <ExternalButton
                href="/Wanjala_Stephen_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                kind="secondary"
                icon={<DownloadIcon />}
                className="min-w-52"
              >
                Download CV
              </ExternalButton>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full max-w-xs md:max-w-none bg-layer md:order-last">
            <div className="absolute top-3 left-3 -right-3 -bottom-3 bg-blue-60" aria-hidden="true" />
            <Image
              src="/images/profile.jpg"
              alt="Stephen Wanjala"
              fill
              className="object-cover object-[50%_20%]"
              priority
              sizes="(max-width: 768px) 320px, 384px"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
