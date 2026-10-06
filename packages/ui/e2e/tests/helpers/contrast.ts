// Serialized into the browser by locator.evaluate; keep dependencies local.
// Bounded to flat, unfiltered fixture text over solid/alpha ancestor fills.
export function renderedContrast(element: Element) {
  type Color = [number, number, number, number];
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d', {
    willReadFrequently: true,
    colorSpace: 'srgb',
    colorType: 'float16',
  } as CanvasRenderingContext2DSettings & { colorType: string });
  if (!context) throw new Error('Canvas 2D unavailable');
  const parse = (css: string): Color => {
    if (!CSS.supports('color', css)) throw new Error(`Unsupported color: ${css}`);
    context.clearRect(0, 0, 1, 1);
    // Parse computed alpha separately: transparent canvas readback quantizes it.
    // Convert the opaque color through the browser, then composite exact CSS alpha.
    const slash = css.match(/\/\s*([\d.]+)(%)?\s*\)$/);
    const rgba = css.match(/^rgba\(.+,\s*([\d.]+)\)$/);
    const alpha = slash ? Number(slash[1]) / (slash[2] ? 100 : 1) : rgba ? Number(rgba[1]) : 1;
    const opaque = slash
      ? css.replace(/\/[^/]*\)$/, '/ 1)')
      : rgba
        ? css.replace(/,[^,]*\)$/, ', 1)')
        : css;
    // The browser converts CSS colors (including OKLab/color-mix) to sRGB.
    context.fillStyle = opaque;
    context.fillRect(0, 0, 1, 1);
    const pixels = context.getImageData(0, 0, 1, 1, {
      colorSpace: 'srgb',
      pixelFormat: 'rgba-float16',
    });
    if (pixels.data instanceof Uint8ClampedArray)
      throw new Error('Float canvas readback unavailable');
    const color = Array.from(pixels.data) as Color;
    if (color[3] !== 1) throw new Error(`Unsupported computed alpha syntax: ${css}`);
    color[3] = alpha;
    return color;
  };
  const over = (front: Color, back: Color): Color => {
    const alpha = front[3] + back[3] * (1 - front[3]);
    return [
      ...front
        .slice(0, 3)
        .map((v, i) => (alpha ? (v * front[3] + back[i] * back[3] * (1 - front[3])) / alpha : 0)),
      alpha,
    ] as Color;
  };
  const luminance = (color: Color) =>
    color.slice(0, 3).reduce((sum, v, i) => {
      const linear = v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      return sum + linear * [0.2126, 0.7152, 0.0722][i];
    }, 0);
  const ratio = (a: Color, b: Color) => {
    const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y);
    return (high + 0.05) / (low + 0.05);
  };
  const backgrounds: Color[] = [];
  for (let node: Element | null = element; node; node = node.parentElement) {
    const style = getComputedStyle(node);
    if (
      style.opacity !== '1' ||
      style.backgroundImage !== 'none' ||
      style.filter !== 'none' ||
      style.backdropFilter !== 'none' ||
      style.mixBlendMode !== 'normal' ||
      style.backgroundBlendMode !== 'normal' ||
      style.textShadow !== 'none'
    )
      throw new Error(`Unsupported contrast effect on ${node.tagName}`);
    for (const pseudo of ['::before', '::after']) {
      const content = getComputedStyle(node, pseudo).content;
      if (content !== 'none' && content !== 'normal') {
        throw new Error(`Unsupported generated content on ${node.tagName}${pseudo}`);
      }
    }
    backgrounds.push(parse(style.backgroundColor));
  }
  let background: Color = [0, 0, 0, 0];
  for (const fill of backgrounds.reverse()) background = over(fill, background);
  if (background[3] !== 1) throw new Error('No opaque ancestor background');
  const style = getComputedStyle(element);
  const foreground = over(parse(style.color), background);
  const black: Color = [0, 0, 0, 1];
  const white: Color = [1, 1, 1, 1];
  return {
    ratio: ratio(foreground, background),
    foreground: style.color,
    background: getComputedStyle(element).backgroundColor,
    effectiveBackground: background,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    sanity: {
      blackWhite: ratio(black, white),
      equal: ratio(white, white),
      alpha: over([0, 0, 0, 0.5], white),
      cssAlpha: parse('rgb(0 0 0 / 50%)')[3],
      oklabWhite: parse('oklab(1 0 0)'),
      mixedGray: parse('color-mix(in srgb, black 50%, white)'),
    },
  };
}
