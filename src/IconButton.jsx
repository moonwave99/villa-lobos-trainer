import cx from "clsx";

export default function IconButton({
  onClick,
  children,
  icon,
  toggable,
  toggled,
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      aria-label={children}
      title={children}
      className={cx("icon-button", { toggable, toggled })}
      {...rest}
    >
      <img src={`/icons/${icon}.png`} alt={children} />
    </button>
  );
}
