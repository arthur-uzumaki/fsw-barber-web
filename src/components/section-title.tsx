interface SectionTitleProps {
  title: string
}
export function SectionTitle(props: SectionTitleProps) {
  return <h2 className="mb-3 mt-6 text-sm text-gray-400">{props.title}</h2>
}
