// update samplerList with new samplers
// ["klms","dpm2","dpm2_ancestral","heun","euler","euler_ancestral","plms", "ddim", "dpm_fast", "dpm_adaptive", "dpmpp_2s_a", "dpmpp_2m"]

export enum Sampler {
  EulerAncestral = "euler_ancestral",
  Euler = "euler",
  Klms = "klms",
  Plms = "plms",
  Ddim = "ddim",
  Dpm2 = "dpm2",
  Dpm2Ancestral = "dpm2_ancestral",
  Heun = "heun",
  DpmFast = "dpm_fast",
  DpmAdaptive = "dpm_adaptive",
  Dpmpp2sA = "dpmpp_2s_a",
  Dpmpp2mA = "dpmpp_2m_a",
}

export enum SeedBehavior {
  Iter = "iter",
  Fixed = "fixed",
  Random = "random",
}

export enum AnimationMode {
  ThreeD = "3D",
}

export enum PaddingMode {
  Border = "border",
  Reflection = "reflection",
  Zero = "zero",
}

export enum SamplingMode {
  Bicubic = "bicubic",
  Bilinear = "bilinear",
  Nearest = "nearest",
}

export enum Border {
  Warp = "warp",
  Replicate = "replicate",
}

export const samplerList = [
  Sampler.EulerAncestral,
  Sampler.Euler,
  Sampler.Klms,
  Sampler.Plms,
  Sampler.Ddim,
  Sampler.Dpm2,
  Sampler.Dpm2Ancestral,
  Sampler.Heun,
  Sampler.DpmFast,
  Sampler.DpmAdaptive,
  Sampler.Dpmpp2sA,
  Sampler.Dpmpp2mA,
];

export const seedBehaviorList = [
  SeedBehavior.Iter,
  SeedBehavior.Fixed,
  SeedBehavior.Random,
];

export const animationModeList = [AnimationMode.ThreeD];

export const paddingModeList = [
  PaddingMode.Border,
  PaddingMode.Reflection,
  PaddingMode.Zero,
];

export const samplingModeList = [
  SamplingMode.Bicubic,
  SamplingMode.Bilinear,
  SamplingMode.Nearest,
];

export const borderList = [Border.Warp, Border.Replicate];
