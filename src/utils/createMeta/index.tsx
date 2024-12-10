import { Metadata } from "next";

const client = process.env.NEXT_PUBLIC_CLIENT;

const createMeta = ({
  title,
  description,
}: {
  title?: string;
  description: string;
}): Metadata => {
  return {
    title: `마피아 게임${title}`,
    description,
    keywords: "마피아, 게임, 마피아게임, 경찰, 의사, 시민, 마피아",
    openGraph: {
      title: `마피아 게임${title}`,
      description,
      type: "website",
      locale: "ko_KR",
      images: {
        url: `${client}/assets/common/og-image.png`,
      },
      url: client,
    },
  };
};

export default createMeta;
