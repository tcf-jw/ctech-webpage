import { cn } from '@/lib/utils'
import { srcFor, srcSetFor, type ImageAsset } from '@/components/home/images'

type ResponsiveImageProps = {
  image: ImageAsset
  sizes: string
  priority?: boolean
  className?: string
}

export function ResponsiveImage({
  image,
  sizes,
  priority = false,
  className,
}: ResponsiveImageProps) {
  return (
    <img
      src={srcFor(image)}
      srcSet={srcSetFor(image)}
      sizes={sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      className={cn('object-cover', className)}
    />
  )
}
