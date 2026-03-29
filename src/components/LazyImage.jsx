export function LazyImage({ src, alt, className, eager = false, ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      {...rest}
    />
  )
}
