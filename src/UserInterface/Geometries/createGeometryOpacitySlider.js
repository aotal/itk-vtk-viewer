import getContrastSensitiveStyle from '../getContrastSensitiveStyle';

import style from '../ItkVtkViewer.module.css';

import opacityIcon from '../icons/opacity.svg';

function createGeometryOpacitySlider(
  viewerStore,
  geometryHasScalars,
  geometrySelector,
  geometryColorRow
) {
  const contrastSensitiveStyle = getContrastSensitiveStyle(
    ['invertibleButton'],
    viewerStore.isBackgroundDark
  );
  const geometryOpacities = new Array(geometryHasScalars.length);
  const defaultGeometryOpacity = 1.0;
  geometryOpacities.fill(defaultGeometryOpacity);
  const sliderEntry = document.createElement('div');
  sliderEntry.setAttribute('class', style.sliderEntry);
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Opacity" class="${
      contrastSensitiveStyle.invertibleButton
    } ${style.gradientOpacitySlider}">
      ${opacityIcon}
    </div>
    <input type="range" min="0" max="1" value="${defaultGeometryOpacity}" step="0.01"
      id="${viewerStore.id}-geometryOpacitySlider"
      class="${style.slider}" />`;
  const opacityElement = sliderEntry.querySelector(
    `#${viewerStore.id}-geometryOpacitySlider`
  );
  function updateOpacity() {
    const value = Number(opacityElement.value);
    geometryOpacities[geometrySelector.selectedIndex] = value
    viewerStore.geometriesUI.representationProxies[geometrySelector.selectedIndex].setOpacity(value)
    viewerStore.renderWindow.render();
  }
  opacityElement.addEventListener('input', updateOpacity);
  updateOpacity();
  geometrySelector.addEventListener('change',
    (event) => {
      opacityElement.value = geometryOpacities[geometrySelector.selectedIndex]
    });
  geometryColorRow.appendChild(sliderEntry);
}

export default createGeometryOpacitySlider;
