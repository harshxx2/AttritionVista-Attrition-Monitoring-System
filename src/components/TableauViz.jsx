import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

/**
 * Optimized Tableau embed with:
 * - IntersectionObserver for lazy loading (only loads when in viewport)
 * - Sleek skeleton loader instead of spinner
 * - No artificial timeout delays
 */
const TableauViz = forwardRef(({ url, filters = {}, height = '700px' }, ref) => {
  const containerRef = useRef(null);
  const vizRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [vizElement, setVizElement] = useState(null);

  // Expose export methods to parent
  useImperativeHandle(ref, () => ({
    exportPDF: () => vizElement?.displayDialog('export-pdf'),
    exportImage: () => vizElement?.displayDialog('export-image'),
  }));

  // Lazy load — only start loading when the element enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Load the Tableau viz once visible
  useEffect(() => {
    if (!isVisible || !vizRef.current || !url) return;

    // Add the Tableau embedding API script if needed
    if (!document.getElementById('tableau-embedding-api')) {
      const script = document.createElement('script');
      script.id = 'tableau-embedding-api';
      script.type = 'module';
      script.src = 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js';
      document.head.appendChild(script);
    }

    vizRef.current.innerHTML = '';

    const isTableauVizDefined = customElements.get('tableau-viz');

    if (isTableauVizDefined) {
      const viz = document.createElement('tableau-viz');
      viz.src = url;
      viz.toolbar = 'hidden';
      viz.hideTabs = true;
      viz.width = '100%';
      viz.height = height;

      viz.addEventListener('firstinteractive', async () => {
        setIsLoaded(true);
        const sheet = viz.workbook.activeSheet;
        for (const [field, value] of Object.entries(filters)) {
          if (value && value !== 'All') {
            await sheet.applyFilterAsync(field, [value], 'replace');
          }
        }
      });
      vizRef.current.appendChild(viz);
      setVizElement(viz);
    } else {
      // Iframe fallback
      const iframe = document.createElement('iframe');
      iframe.src = `${url}?:showVizHome=no&:embed=true&:toolbar=no&:tabs=no`;
      iframe.width = '100%';
      iframe.height = height;
      iframe.style.border = 'none';
      iframe.loading = 'lazy';
      iframe.onload = () => setIsLoaded(true);
      vizRef.current.appendChild(iframe);
    }
  }, [isVisible, url, filters, height]);

  return (
    <div ref={containerRef} className="relative w-full rounded-none overflow-hidden bg-card border border-white/5" style={{ height }}>
      {/* Skeleton Loader */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0D18]/80 z-10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            {/* Animated pulse bars */}
            <div className="flex items-end gap-1.5 h-10">
              {[0.6, 1, 0.4, 0.8, 0.5, 0.9, 0.3].map((h, i) => (
                <div
                  key={i}
                  className="w-2 bg-accent/30 rounded-none animate-pulse"
                  style={{
                    height: `${h * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1.5s'
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-muted font-mono tracking-wider">
              {url ? 'LOADING DASHBOARD...' : 'AWAITING TABLEAU URL'}
            </p>
          </div>
        </div>
      )}
      <div ref={vizRef} className="w-full h-full" />
    </div>
  );
});

export default TableauViz;
