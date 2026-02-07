import VisaTool from "@/components/VisaTool";
import ImmigrationCalc from "@/components/ImmigrationCalc";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-gradient-to-r from-primary to-secondary text-white rounded-3xl mx-4 md:mx-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">🌍 منصة شاملة للهجرة والتأشيرات</h1>
        <p className="text-xl md:text-2xl text-gray-300">تحقق من التأشيرات، احسب نقاط الهجرة، واكتشف المنح الدراسية</p>
      </section>
      <div className="container mx-auto px-4">
        <VisaTool />
        <ImmigrationCalc />
      </div>
    </div>
  );
}
