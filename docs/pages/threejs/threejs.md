# 创建 3D 场景时，唯一的限制是您的想象力 - 以及您的技术知识深度。

## 1. 所有步骤

:::details

1. 初始设置
2. 创建场景
3. 创建相机
4. 创建立方体并将其添加到场景中
5. 创建渲染器

附加任务：设置场景的大小

6. 渲染场景

:::

## 2. 分模块（每个模块都是一个文件）

### 2.1 模块分为两类 组件（components）和 系统级（system)

### 2.2 组件（components）是可以放置到场景中的任何东西，例如立方体、相机和场景本身，

### 2.3 而系统是在组件或其他系统上运行的东西。在这里，是渲染器和大小调整函数(Resizer)

## 3. 场景图

1. 场景图中的每个对象（顶级场景除外）只有一个父对象，并且可以有任意数量的子对象。
2. 通过`.children`数组来访问所有子对象，也可以通过`getObjectByName`（有名称的话）
3. 因为一个对象只能有一个父对象，所以在将 A 下面的字元素 a 移动到 B 对象，那么 A 对象会删除
4. 我们最终在屏幕上看到的是世界空间。

## 4. 世界空间和局部空间

顶级场景定义了世界空间，而其他每个对象都定义了自己的局部空间。

## 5. 平移(translation) 缩放(scale) 旋转(rotation)

:::tip

1. 平移 和 缩放 都存储于 `Vector3` 中
2. 相机和灯光（除了` RectAreaLight`）没有大小，因此缩放它们没有意义。更改 camera.scale 或 light.scale 将没有效果。
   :::

:::details 平移(translation)

```js
// translate one axis at a time
mesh.position.x = 1;
mesh.position.y = 2;
mesh.position.z = 3;

// translate all three axes at once
mesh.position.set(1, 2, 3);
```

:::

:::details 缩放(scale)

**1. 小于 0 的比例会镜像对象**
**2. 缩放没有单位**

```js
// when we create a mesh...
const mesh = new Mesh();

// ... internally, three.js creates a Vector3 for us:
mesh.scale = new Vector3(1, 1, 1);
```

:::

:::details 旋转(scale)

请记下这两种旋转对象的方法：
**1. 使用欧拉角，使用 Euler 类表示并存储在.rotation 属性中。**
**2. 使用四元数，使用 Quaternion 类表示并存储在.quaternion 属性中。**
**3. 灯光无法旋转，灯光从某个位置照射到目标，灯光的角度是根据目标的位置而不是.rotation 属性计算得出的。**

```js
import { Euler } from "three";
//  使用欧拉角
const euler = new Euler(1, 2, 3);

// 使用四元数
mesh.quaternion = new Quaternion();
```

:::

## 6 three.js 中的所有其他角度都是使用 弧度而不是 度数 指定的，只有透视投影的视野(fov)是度数

:::tip degToRad 将度数变为弧度

```js
import { MathUtils } from "three";

const rads = MathUtils.degToRad(90);
```

:::

## 7. 变换矩阵

向量和欧拉角对我们人类来说（相对）容易使用，但它们对于计算机处理的效率并不高。而矩阵效率更高

4X4 矩阵用 `Matrix4`
3X3 矩阵用 `Matrix3`

```js
// 创建一个网格
const mesh = new Mesh();

//three.js 会自动创建 局部矩阵 和 世界矩阵
mesh.matrix = new Matrix4();
mesh.matrixWorld = new Matrix4();
```

:::details 局部矩阵

1. 每个对象都不止一个，而是有两个变换矩阵。其中第一个是局部矩阵，它包含一个对象的`.position`、`.rotation`和`.scale`组合。局部矩阵存储在 `Object3D.matrix`属性中。继承自`Object3D`的每个对象都具有此属性。
2. `.position`存储在矩阵的前三行的第四列
3. `.rotation`存储在矩阵的前三行的对角线上
<!-- 4. `.scale`存储在矩阵的前三行的第四列 -->

:::
:::details 世界矩阵

1. 世界矩阵存储在 `Object3D.matrixWorld`属性中
2. **世界矩阵存储对象在世界空间中的位置。**如果对象是场景的直接子对象，那么世界矩阵和局部矩阵是相同的，否则则很大可能不同

:::

## 8. 动画循环

:::tip

1. **我们的动画循环不会以固定速率生成帧,该循环将尝试以硬件定义的屏幕刷新率渲染帧**,会在旧的慢速设备上旋转得更慢，而在花哨的新 240Hz 游戏显示器上它将进入超高速状态。240=4×60，这意味着立方体将以所需速度的四倍旋转！
2. **我们需要将动画速度与帧速率解耦**。我们将这样做：当我们告诉一个对象.tick 前进一帧时，我们将根据前一帧花费的时间来缩放移动的大小。这样，随着帧速率的变化，我们将不断调整每个.tick 的大小，以使动画保持流畅。
3. `.getDelta` **告诉我们自上次调用**`.getDelta`以来已经过去了多少时间。如果我们在每一帧开始时调用它一次，并且只调用一次，它将告诉我们前一帧花了多长时间。**注意：如果您每帧调用`.getDelta`不止一次，后续调用的测量值将接近于零。**只在一帧开始时调用`.getDelta`一次

:::detail Clock

```js
import { Clock } from "three";

const clock = new Clock();

const delta = clock.getDelta();
```

::::

:::

:::details .setAnimationLoop

1. 内部，循环是使用 .requestAnimationFrame

```js
import { WebGLRenderer } from "three";
const renderer = new WebGLRenderer();

// 开启这个动画 ，这将一遍又一遍地调用renderer.render以生成帧流。
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
// 通过传递null作为回调来取消正在运行的循环：
renderer.setAnimationLoop(null);
```

:::

## 9. 纹理

:::tip

### 图像和纹理的区别

1. 图像是设计用于人类观看的 2D 图片。
2. 纹理是专门为 3D 图形中的各种目的而准备的数据。

### 像素和纹素

1. 构成屏幕的像素是实际的物理对象，LED 或 OLED 或其他一些高科技设备，而构成图像的像素只是存储在文件中的数字。
2. 我们将称**构成屏幕像素的点为像素 pixels**，但将**构成纹理的点称为纹素 texels**。

### UV 映射

1. UV 映射是一种获取二维纹理并将其映射到三维几何体的方法。想
2.

:::

1. **纹理可用于存储各种数据**，例如颜色、凹凸度、不透明度、表面上的小阴影（称为环境光遮蔽）、光照、金属度和粗糙度等等。例如，不同的材料接受不同种类和组合的纹理，因此 MeshBasicMaterial 不接受所有与 MeshStandardMaterial 相同的纹理。
2. 一个以 PNG 格式存储的普通 2D 图像文件，我们将使用`TextureLoader`加载它，这将返回 `Texture`类的一个实例。您可以以相同的方式使用浏览器支持的任何图像格式，例如 PNG、JPG、GIF、BMP。
3. 还有一些专用图像格式的加载器，如`HDR`、`EXR`和`TGA`，它们具有相应的加载器，如 `TGALoader`。同样，一旦加载，我们将获得一个`Texture`实例，我们可以以与加载的 PNG 或 JPG 图像大致相同的方式使用它。
4. three.js 还支持许多其他类型的非简单 2D 图像的纹理，例如 视频纹理、 3D 纹理、 画布纹理、 压缩纹理、 立方体纹理、 矩形纹理等等。
5. **纹理贴图**：尽管在技术上不正确，但纹理通常也称为**贴图**，甚至是**纹理贴图**，尽管**贴图**最常用于将纹理分配给材质。当使用纹理来表示颜色时，我们会说**我们正在将纹理分配给材质上的颜色贴图槽**。下面，我们将向您展示如何将 uv-test-bw.png 纹理分配给 MeshStandardMaterial 的颜色贴图槽。

:::details Texture 类

1. **类 Texture 是 HTML 图像元素的包装器**，具有一些与用作纹理而不是普通图像相关的额外设置。
2. 可以在`image.texture`下访问原始图像
3. `TextureLoader.load`方法可以加载任何标准图像格式的纹理，例如 PNG、JPEG、GIF、BMP 等。
4. 我们使用 `.color`属性设置材质的颜色。在这里，我们将`texture`分配给 `material.map`属性，该属性描述颜色在对象表面上的变化方式
5. **_通常，我们要么设置一个`.color`，或者要么设置一个`.map`_**，**但不能同时设置。如果我们确实同时设置了，纹理中的颜色则将乘以.color 属性**。
6. 常见用例：**将颜色设置为灰色阴影以使纹理变暗**。由于白色是默认颜色，**设置`.color`为白色不会影响纹理**。因此，无法使用.color 来使纹理变亮，**您只能将其变暗。**

```js
// 在构造函数中将纹理分配给材质
const material = new MeshStandardMaterial({
  map: texture,
});

// 创建材质后分配纹理
const material = new MeshStandardMaterial();
material.map = texture;
```

:::

## 10. OrbitControls 相机控制插件

:::tip

1. **`OrbitControls`构造函数有两个参数：`Camera`和 `HTMLDOMElement`**,我们将使用相机作为第一个参数，使用存储在`renderer.domElement`中的画布作为第二个参数。
2. **控件将监听我们作为第二个参数传入的元素上的用户输入**。页面的其余部分将不受影响。
3. 默认情况下，控件围绕场景中心旋转，即点(0,0,0)。 这存储在`controls.target`属性中，即`Vector3`。
4. **启用阻尼以增加真实感**，调整 `.dampingFactor`以控制相机停止的速度，**为了使阻尼起作用，我们必须在动画循环中的每一帧都调用 `controls.update`。如果我们是 按需渲染帧而不是使用循环，我们就不能使用阻尼。**

```js
function createControls(camera, canvas) {
  // 创建控件controls
  const controls = new OrbitControls(camera, canvas);
  // 设置控件的目标
  controls.target.set(1, 2, 3);
  // 还可以通过复制对象的位置来将控件指向对象。指向对象的位置
  // 每当您平移控件（使用鼠标右键）时，目标也会平移。
  // 如果需要固定目标，可以使用controls.enablePan = false禁用平移。
  controls.target.copy(cube.position);
  return controls;
}
```

:::

:::details ` OrbitControls`相机控制插件

1.  `OrbitControls`相机控制插件,它允许您使用触摸、鼠标或键盘来环绕、平移和缩放相机。通过这些控件，我们可以从各个角度查看场景，放大以检查微小细节，或缩小以鸟瞰概览。
2.  使用鼠标左键或单指轻扫，围绕固定点旋转。
3.  使用鼠标右键、箭头键或两指滑动来平移相机。
4.  使用滚轮或捏合手势缩放相机。

:::

:::details 在使用 OrbitControls 时让相机工作

1. 控件 controls 就位后，我们将相机的控制权交给了他们。但是，有时您需要收回控制权以手动定位相机。有两种方法可以解决这个问题：

- 1.1 剪切/跳转到新的摄像机位置
- 1.2 平滑动画到新的相机位置

### 1. 剪切到新的摄像机位置#

1. 要执行相机剪切，请照常更新相机的变换，然后调用`controls.update`：
2. 如果您在循环中调用.update，则无需手动操作，只需移动相机即可
3. **注意：**当您移动相机时，`controls.target`不会移动。如果您没有移动它，它将保持在场景的中心。当您将相机移动到新位置但保持目标不变时，相机不仅会移动，还会旋转，以便继续指向目标。这意味着在使用控件时，相机移动可能无法按预期工作。通常，您需要同时移动相机和目标以获得所需的结果。

```js
// 使用OrbitControls时手动调整相机变换
// move the camera
camera.position.set(1, 2, 3);

// and/or rotate the camera
camera.rotation.set(0.5, 0, 0);

// then tell the controls to update
controls.update();
```

### 2. 平滑过渡到新的相机位置

1. 如果您想将相机平滑地动画移动到一个新位置，您可能需要同时转换相机和目标，而最好的做这件事的地方就是`controls.tick`方法中。
   **但是：**，您需要在动画期间禁用控件，否则，如果用户在动画完成之前尝试移动相机，您最终会遇到与动画冲突的控件，通常会导致灾难性的后果。

```js
// 为相机或目标设置动画时禁用控件
controls.enabled = false;
```

### 3. 保存和恢复视图状态

1. 您可以使用 `.saveState`保存当前视图，然后使用` .reset`恢复它：
2. 如果我们在没有先调用`.saveState`的情况下调用`.reset`，相机将跳回到我们创建控件时的位置。

```js
// 保存状态
controls.saveState();

// 恢复状态
controls.reset();
```

### 4. 销毁控件 Controls

1. 可以使用 `.dispose`清理它们，这将从画布中删除控件创建的所有事件侦听器。

```js
// 从画布中删除所有事件侦听
controls.dispose();
```

:::

::: details 使用 OrbitControls 按需渲染

1.  因为循环确实有一些缺点，例如增加移动设备上的电池耗电量。因此，有时我们会选择按需渲染帧，而不是使用循环生成恒定的帧流。
2.  我们的应用有了轨道控件，**每当用户与你的场景交互时，控件都会将相机移动到一个新的位置，** 当这种情况发生时**你必须绘制一个新的帧**，否则**你将无法看到相机已移动**。如果您使用的是动画循环，那不是问题。但是，如果我们是按需渲染，我们将不得不想出其他办法来解决这个问题
3.  `OrbitControls`提供了一种在相机移动时生成新帧的简单方法。控件有一个自定义事件`change`，我们可以使用 `addEventListener`来监听。**每当用户交互导致控件移动相机时，都会触发此事件。**

### 使用 OrbitControls 按需渲染

要使用轨道控件按需渲染，您必须在此事件触发时渲染一帧：

```js
controls.addEventListener("change", () => {
  renderer.render(scene, camera);
});
```

:::

:::details OrbitControls 配置

### 1. 启用或禁用控件

```js
//  启用或禁用控件
controls.enabled = false;
// 单独设置三种控制模式中的一种
controls.enableRotate = false;
controls.enableZoom = false;
controls.enablePan = false;
```

### 2. 监听按键事件并使用箭头键平移相机

```js
// 启用箭头键
controls.listenToKeyEvents(window);
```

### 3. 自动旋转：`.autoRotate`将使相机自动围绕`.target`旋转，然后 `.autoRotateSpeed`控制速度

与`.enableDamping`一样，您必须在每一帧都调用`controls.update`才能使其正常工作。
**请注意，如果控件被禁用，.autoRotate 仍然可以工作。**

```js
// 自动旋转
controls.autoRotate = true;
// 控制速度
controls.autoRotateSpeed = 1;
```

### 4. 限制缩放：限制控件放大或缩小的距离，**确保`minDistance`不小于 相机的近剪裁平面且`maxDistance`不大于 相机的远剪裁平面**。此外，**minDistance 必须小于 maxDistance。**

```js
controls.minDistance = 5;
controls.maxDistance = 20;
```

### 5. 限制旋转：限制控件的水平旋转（方位角）和垂直（极角）

**旋转是使用弧度指定的，而不是度数，并且 π 弧度等于 180**

```js
// 水平旋转（方位角）
controls.minAzimuthAngle = -Infinity; // default
controls.maxAzimuthAngle = Infinity; // default
// 垂直（极角）
controls.minPolarAngle = 0; // default
controls.maxPolarAngle = Math.PI; // default
```

:::
