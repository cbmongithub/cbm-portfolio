"use client";
import Link from "next/link";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";

import { AnimatedBackground } from "@/components/ui/animated-background";
import { Magnetic } from "@/components/ui/magnetic";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import { Spotlight } from "@/components/ui/spotlight";
import { Heading, Text } from "@/components/ui/typography";

import { BLOG_POSTS, PROJECTS, WORK_EXPERIENCE } from "@/lib/config";
import { SOCIAL_LINKS } from "@/lib/config";
import {
  CONTAINER_VARIANTS,
  SECTION_DURATION_VARIANT,
  SECTION_VARIANTS,
} from "@/lib/config";
import { EMAIL_LINK } from "@/lib/config";

type ProjectVideoProps = {
  src: string;
};

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <video
          src={src}
          autoPlay
          loop
          muted
          className="aspect-video w-full cursor-zoom-in rounded-lg"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="bg-card ring-border relative aspect-video rounded-2xl p-1 ring-1 ring-inset">
          <video
            src={src}
            autoPlay
            loop
            muted
            className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <TwitterLogoIcon className="text-muted size-5" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <Link
        href={link}
        className="group bg-muted text-foreground hover:bg-foreground hover:text-background relative inline-flex shrink-0 items-center gap-px rounded-full px-2.5 py-1 text-sm transition-colors duration-200"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
    </Magnetic>
  );
}

export default function Personal() {
  return (
    <motion.main
      className="space-y-24"
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={SECTION_VARIANTS} transition={SECTION_DURATION_VARIANT}>
        <div className="flex-1">
          <Heading asChild level={2}>
            Hi I&apos;m Christian
          </Heading>
          <Text muted>
            Focused on creating intuitive and performant web experiences. Bridging the gap
            between design and development.
          </Text>
        </div>
      </motion.section>

      <motion.section variants={SECTION_VARIANTS} transition={SECTION_DURATION_VARIANT}>
        <Heading asChild level={4} className="mb-2">
          Selected Projects
        </Heading>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map(({ name, video, link, description }, i) => (
            <div key={`${name}_${i}`} className="space-y-2">
              <div className="bg-card ring-border relative rounded-2xl p-1 ring-1 ring-inset">
                <ProjectVideo src={video} />
              </div>
              <div className="px-1">
                <Link
                  className="font-base group text-foreground relative inline-block font-[450]"
                  href={link}
                  target="_blank"
                >
                  {name}
                  <span className="bg-foreground absolute bottom-0.5 left-0 block h-px w-full max-w-0 transition-all duration-200 group-hover:max-w-full"></span>
                </Link>
                <Text muted className="text-base">
                  {description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={SECTION_VARIANTS} transition={SECTION_DURATION_VARIANT}>
        <Heading asChild level={4} className="mb-2">
          Work Experience
        </Heading>
        <div className="flex flex-col space-y-2">
          {WORK_EXPERIENCE.map(({ link, id, title, company, start, end }, i) => (
            <a
              key={`${id}_${i}`}
              className="bg-muted relative overflow-hidden rounded-2xl p-px"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Spotlight
                className="from-link via-foreground/70 to-link blur-2xl"
                size={64}
              />
              <div className="bg-card relative h-full w-full rounded-[15px] p-4">
                <div className="relative flex w-full flex-row justify-between">
                  <div>
                    <Text className="text-foreground font-medium">{title}</Text>
                    <Text muted>{company}</Text>
                  </div>
                  <Text muted>
                    {start} - {end}
                  </Text>
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      <motion.section variants={SECTION_VARIANTS} transition={SECTION_DURATION_VARIANT}>
        <Heading asChild level={4} className="mb-1">
          Blog
        </Heading>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="bg-muted h-full w-full rounded-lg"
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map(({ uid, link, title, description }, i) => (
              <Link
                key={`${uid}_${i}`}
                className="-mx-3 rounded-xl px-3 py-3"
                href={link}
                data-id={uid}
              >
                <div className="flex flex-col space-y-1">
                  <Text className="text-foreground py-0 font-medium">{title}</Text>
                  <Text muted>{description}</Text>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>

      <motion.section variants={SECTION_VARIANTS} transition={SECTION_DURATION_VARIANT}>
        <Heading asChild level={4}>
          Connect
        </Heading>
        <Text muted>
          Feel free to contact me at{" "}
          <Link
            className="text-link hover:text-link/80 transition-colors"
            href={`mailto:${EMAIL_LINK}`}
          >
            {EMAIL_LINK}
          </Link>
        </Text>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map(({ label, link }, i) => (
            <MagneticSocialLink key={`${label}_${i}`} link={link}>
              {label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
}
