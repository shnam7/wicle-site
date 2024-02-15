/**
 * @package wicle
 *
 * Example:
 * Container = [Surface1, Surface2, ...], perspective=0.5
 * Surface1 scrolls normally, Surface2 scrolls 50%, Surface scrolls 25%, ...
 *
 * Note: If parent node has 'transform' property, 'fixed' property of Surface object does not work.
 *       In this case, Surface will move by the parent, and move again by the scroll handler,
 *          which will make all the surfaces move faster than window
 */

export class Container {
    private content: HTMLElement
    private surface: Surface[]
    private perspective: number
    private lastPerspective: number

    /**
     *   Creates a Container for a Parallax
     *
     *   @param {HTMLElement} scrollableContent The container that will be parallaxed
     *   @param {perspective} perspective The ratio of how much back content should be scrolled
     *          relative to forward content. For example, if this value is 0.5, and there are 2 surfaces,
     *          the front-most surface would be scrolled normally, and the surface behind it would be scrolled
     *          half as much.
     */
    constructor(scrollableContent: HTMLElement, perspective: number) {
        this.content = scrollableContent
        this.surface = []
        this.perspective = perspective
        this.lastPerspective = 1           // perspective of lowest surface

        scrollableContent.addEventListener('scroll', (event: Event) => {
            this.onContainerScroll(event)
        })
        // jQuery(scrollableContent).on('scroll', (event: JQuery.Event) => {
        //     this.onContainerScroll(event)
        // })
    }

    private onContainerScroll(e: Event): void {
        let currentScrollPos = this.content.scrollTop
        for (let surface of this.surface)
            surface.scroll(-currentScrollPos)
    }

    addSurface(surface: Surface): void {
        if (this.surface.length == 0) {     // if first surface
            if (surface.perspective <= 0) surface.perspective = 1
        }
        else {
            if (surface.perspective <= 0) surface.perspective = this.perspective
            surface.perspective *= this.lastPerspective
        }
        this.lastPerspective = surface.perspective
        this.surface.push(surface)
        // console.log(surface, 'perspective=', surface.perspective);
    }
}

export class Surface {
    private content: HTMLElement

    /**
     *  Create a Surface for a Palallax
     *
     *  @param surfaceContents
     *  @param perspective Initial perspective of the surface.
     *  @param cssPosition CSS position property: Should be absolute or fixed
     */
    constructor(surfaceContents: HTMLElement, public perspective: number = 0, cssPosition: string = 'fixed') {
        this.content = surfaceContents

        surfaceContents.style.cssText = `position: cssPosition; transform: 'none'`
        // jQuery(surfaceContents).css({
        //     position: cssPosition,
        //     transform: 'none'
        // })
    }

    public scroll(scrollPos: number) {
        this.content.style.transform = `translate3d(0, ${scrollPos * this.perspective}px, 0)`
        // jQuery(this.content).css({
        //     transform: `translate3d(0, ${scrollPos * this.perspective}px, 0)`
        // })
    }
}

export const Parallax = { Container, Surface }
export default Parallax
