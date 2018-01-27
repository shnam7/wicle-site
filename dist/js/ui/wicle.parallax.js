///<reference types="jquery"/>
var Wicle;
(function (Wicle) {
    var Parallax;
    (function (Parallax) {
        var Container = /** @class */ (function () {
            /**
             *   Creates a Container for a Parallax
             *
             *   @param {HTMLElement} scrollableContent The container that will be parallaxed
             *   @param {perspective} perspective The ratio of how much back content should be scrolled
             *          relative to forward content. For example, if this value is 0.5, and there are 2 surfaces,
             *          the front-most surface would be scrolled normally, and the surface behind it would be scrolled
             *          half as much.
             */
            function Container(scrollableContent, perspective) {
                var _this = this;
                this.content = scrollableContent;
                this.surface = [];
                this.perspective = perspective;
                this.lastPerspective = 1; // perspective of lowest surface
                Wicle.$(scrollableContent).scroll(function (event) {
                    _this.onContainerScroll(event);
                });
            }
            Container.prototype.onContainerScroll = function (e) {
                var currentScrollPos = Wicle.$(this.content).scrollTop();
                for (var _i = 0, _a = this.surface; _i < _a.length; _i++) {
                    var surface = _a[_i];
                    surface.scroll(-currentScrollPos);
                }
            };
            Container.prototype.addSurface = function (surface) {
                if (this.surface.length == 0) {
                    if (surface.perspective <= 0)
                        surface.perspective = 1;
                }
                else {
                    if (surface.perspective <= 0)
                        surface.perspective = this.perspective;
                    surface.perspective *= this.lastPerspective;
                }
                this.lastPerspective = surface.perspective;
                this.surface.push(surface);
                // console.log(surface, 'perspective=', surface.perspective);
            };
            return Container;
        }());
        Parallax.Container = Container;
        var Surface = /** @class */ (function () {
            function Surface(surfaceContents, perspective) {
                if (perspective === void 0) { perspective = 0; }
                this.perspective = perspective;
                this.content = surfaceContents;
                Wicle.$(surfaceContents).css({
                    position: 'fixed',
                    transform: 'translate3d(0, 0, 0)'
                });
            }
            Surface.prototype.scroll = function (scrollPos) {
                Wicle.$(this.content).css({
                    transform: "translate3d(0, " + scrollPos * this.perspective + "px, 0)"
                });
            };
            return Surface;
        }());
        Parallax.Surface = Surface;
    })(Parallax = Wicle.Parallax || (Wicle.Parallax = {}));
})(Wicle || (Wicle = {}));
