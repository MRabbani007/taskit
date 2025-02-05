declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const content: string; // For importing as a file path
  export { ReactComponent };
  export default content; // Default export as file path
}
