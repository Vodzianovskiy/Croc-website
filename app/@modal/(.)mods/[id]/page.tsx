import ModModalContent from "@/app/mods/ModModalContent";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ModModalPage({ params }: Props) {
  const { id } = await params;
  return <ModModalContent id={id} />;
}
