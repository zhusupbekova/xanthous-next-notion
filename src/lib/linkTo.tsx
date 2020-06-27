import Link from 'next/link'

export const LinkTo: React.FC<{ address: string; className?: string }> = ({
  address,
  className,
  children,
}) => {
  return (
    <Link href={address}>
      <a className={className}>{children}</a>
    </Link>
  )
}
