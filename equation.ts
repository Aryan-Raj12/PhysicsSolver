// Abstract Base Class
abstract class Equation {
    protected u: number | null;
    protected a: number | null;
    protected t: number | null;
    protected s: number | null;
    protected v: number | null;
    protected f: number | null;
    protected m: number | null;
    protected ke: number | null;
    protected pe: number | null;
    protected g: number | null;
    protected h: number | null;
   
 
 
    constructor(u: number | null = null, a: number | null = null, t: number | null = null,
                s: number | null = null, v: number | null = null, f: number | null = null,
                m: number | null = null, ke: number | null = null,pe: number | null = null,g: number | null = null,h: number | null = null ) {
        this.u = u;
        this.a = a;
        this.t = t;
        this.s = s;
        this.v = v;
        this.f = f;
        this.m = m;
        this.ke = ke;
        this.pe = pe;
        this.g = g;
        this.h = h;
    }
 
 
    protected abstract solve(): string;
    protected abstract plotGraph(): void;
 }
 
 
 // Velocity Equation Class
 class VelocityEquation extends Equation {
    constructor(u: number | null, a: number | null, t: number | null, v: number | null) {
        super(u, a, t, null, v);
    }
 
 
    public solve(): string {
        if (this.v === null) {
            return `Final velocity (v) is ${(this.u! + this.a! * this.t!).toFixed(2)} m/s`;
        } else if (this.u === null) {
            return `Initial velocity (u) is ${(this.v! - this.a! * this.t!).toFixed(2)} m/s`;
        } else if (this.a === null) {
            return `Acceleration (a) is ${((this.v! - this.u!) / this.t!).toFixed(2)} m/s²`;
        } else if (this.t === null) {
            return `Time (t) is ${((this.v! - this.u!) / this.a!).toFixed(2)} s`;
        } else {
            return "Error: Please enter valid inputs.";
        }
    }
 
 
    public plotGraph(): void {
        const timeValues: number[] = [];
        const velocityValues: number[] = [];
 
 
        for (let t = 0; t <= 10; t += 0.5) {
            timeValues.push(t);
            velocityValues.push(this.u! + this.a! * t);
        }
 
 
        const ctx = (document.getElementById('velocityChart') as HTMLCanvasElement).getContext('2d')!;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeValues,
                datasets: [{
                    label: 'Final Velocity vs Time',
                    data: velocityValues,
                    borderColor: 'black',
                    fill: false
                }]
            }
        });
    }
 }
 
 
 // Displacement Equation Class
 class DisplacementEquation extends Equation {
    constructor(u: number | null, a: number | null, t: number | null, s: number | null) {
        super(u, a, t, s);
    }
 
 
    public solve(): string {
        if (this.s === null) {
            return `Displacement (s) is ${(this.u! * this.t! + 0.5 * this.a! * this.t! * this.t!).toFixed(2)} m`;
        } else if (this.u === null) {
            return `Initial velocity (u) is ${((this.s! - 0.5 * this.a! * this.t! * this.t!) / this.t!).toFixed(2)} m/s`;
        } else if (this.a === null) {
            return `Acceleration (a) is ${(2 * (this.s! - this.u! * this.t!) / (this.t! * this.t!)).toFixed(2)} m/s²`;
        } else if (this.t === null) {
            const discriminant = this.u! * this.u! - 2 * this.a! * this.s!;
            if (discriminant < 0) {
                return "No real solutions for time.";
            } else {
                const t1 = (-this.u! + Math.sqrt(discriminant)) / this.a!;
                const t2 = (-this.u! - Math.sqrt(discriminant)) / this.a!;
                return `Time has two possible values: ${t1.toFixed(2)} s and ${t2.toFixed(2)} s`;
            }
        } else {
            return "Error: Please enter valid inputs.";
        }
    }
 
 
    public plotGraph(): void {
        const timeValues: number[] = [];
        const displacementValues: number[] = [];
 
 
        for (let t = 0; t <= 10; t += 0.5) {
            timeValues.push(t);
            displacementValues.push(this.u! * t + 0.5 * this.a! * t * t);
        }
 
 
        const ctx = (document.getElementById('displacementChart') as HTMLCanvasElement).getContext('2d')!;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeValues,
                datasets: [{
                    label: 'Displacement vs Time',
                    data: displacementValues,
                    borderColor: 'red',
                    fill: false
                }]
            }
        });
    }
 }
 
 
 // Force Equation Class
 class ForceEquation extends Equation {
    constructor(f: number | null, m: number | null, a: number | null) {
        super(null, a, null, null, null, f, m);
    }
 
 
    public solve(): string {
        if (this.f === null) {
            return `Force (F) is ${(this.m! * this.a!).toFixed(2)} N`;
        } else if (this.m === null) {
            return `Mass (m) is ${(this.f! / this.a!).toFixed(2)} kg`;
        } else if (this.a === null) {
            return `Acceleration (a) is ${(this.f! / this.m!).toFixed(2)} m/s²`;
        } else {
            return "Error: Please enter valid inputs.";
        }
    }
 
 
    public plotGraph(): void {
        const massValues: number[] = [];
        const forceValues: number[] = [];
 
 
        for (let m = 1; m <= 10; m++) {
            massValues.push(m);
            forceValues.push(m * this.a!);
        }
 
 
        const ctx = (document.getElementById('forceChart') as HTMLCanvasElement).getContext('2d')!;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: massValues,
                datasets: [{
                    label: 'Force vs Mass',
                    data: forceValues,
                    borderColor: 'blue',
                    fill: false
                }]
            }
        });
    }
 }
 
 
 class KineticEnergyEquation extends Equation {
    constructor(m: number | null, v: number | null, ke: number | null) {
        super(null, null, null, null, v, ke, m);
    }
 
 
    public solve(): string {
        if (this.ke === null) {
            return `Kinetic Energy (KE) is ${(0.5 * this.m! * this.v! * this.v!).toFixed(2)} J`;
        } else if (this.m === null) {
            return `Mass (m) is ${(2 * this.ke! / (this.v! * this.v!)).toFixed(2)} kg`;
        } else if (this.v === null) {
            return `Velocity (v) is ${Math.sqrt(2 * this.ke! / this.m!).toFixed(2)} m/s`;
        } else {
            return "Error: Please enter valid inputs.";
        }
    }
 
 
    public plotGraph(): void {
        const velocityValues: number[] = [];
        const kineticEnergyValues: number[] = [];
 
 
        // Using a range of velocities to plot KE
        for (let v = 0; v <= 20; v += 0.5) {
            velocityValues.push(v);
            kineticEnergyValues.push(0.5 * this.m! * v * v);
        }
 
 
        const ctx = (document.getElementById('kineticEnergyChart') as HTMLCanvasElement).getContext('2d')!;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: velocityValues,
                datasets: [{
                    label: 'Kinetic Energy vs Velocity',
                    data: kineticEnergyValues,
                    borderColor: 'green',
                    fill: false
                }]
            }
        });
    }
 }
 
 
 
 
 // Potential Energy Equation Class
 class PotentialEnergyEquation extends Equation {
    constructor(m: number | null, g: number | null, h: number | null, pe: number | null) {
        super(null, null, null, null, null, null, m, null, pe, g, h);
    }
 
 
    public solve(): string {
        if (this.pe === null) {
            return `Potential Energy (PE) is ${(this.m! * this.g! * this.h!).toFixed(2)} J`;
        } else if (this.m === null) {
            return `Mass (m) is ${(this.pe! / (this.g! * this.h!)).toFixed(2)} kg`;
        } else if (this.g === null) {
            return `Gravitational acceleration (g) is ${(this.pe! / (this.m! * this.h!)).toFixed(2)} m/s²`;
        } else if (this.h === null) {
            return `Height (h) is ${(this.pe! / (this.m! * this.g!)).toFixed(2)} m`;
        } else {
            return "Error: Please enter valid inputs.";
        }
    }
 
 
    public plotGraph(): void {
        const heightValues: number[] = [];
        const potentialEnergyValues: number[] = [];
 
 
        // Using a range of heights to plot PE
        for (let h = 0; h <= 20; h += 1) {
            heightValues.push(h);
            potentialEnergyValues.push(this.m! * this.g! * h);
        }
 
 
        const ctx = (document.getElementById('potentialEnergyChart') as HTMLCanvasElement).getContext('2d')!;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: heightValues,
                datasets: [{
                    label: 'Potential Energy vs Height',
                    data: potentialEnergyValues,
                    borderColor: 'purple',
                    fill: false
                }]
            }
        });
    }
 }
 
 
 
 
 
 
 
 
 
 
 // Functions for Solving Each Equation
 function solveFirstEquation() {
    const u = parseFloat((document.getElementById("u1") as HTMLInputElement).value) || null;
    const a = parseFloat((document.getElementById("a1") as HTMLInputElement).value) || null;
    const t = parseFloat((document.getElementById("t1") as HTMLInputElement).value) || null;
    const v = parseFloat((document.getElementById("v1") as HTMLInputElement).value) || null;
 
 
    const velocityEquation = new VelocityEquation(u, a, t, v);
    const answer = velocityEquation.solve();
    (document.getElementById("answer1") as HTMLElement).innerHTML = answer;
    velocityEquation.plotGraph();
 }
 
 
 function solveSecondEquation() {
    const u = parseFloat((document.getElementById("u2") as HTMLInputElement).value) || null;
    const a = parseFloat((document.getElementById("a2") as HTMLInputElement).value) || null;
    const t = parseFloat((document.getElementById("t2") as HTMLInputElement).value) || null;
    const s = parseFloat((document.getElementById("s2") as HTMLInputElement).value) || null;
 
 
    const displacementEquation = new DisplacementEquation(u, a, t, s);
    const answer = displacementEquation.solve();
    (document.getElementById("answer2") as HTMLElement).innerHTML = answer;
    displacementEquation.plotGraph();
 }
 
 
 function solveThirdEquation() {
    const f = parseFloat((document.getElementById("f3") as HTMLInputElement).value) || null;
    const m = parseFloat((document.getElementById("m3") as HTMLInputElement).value) || null;
    const a = parseFloat((document.getElementById("a3") as HTMLInputElement).value) || null;
 
 
    const forceEquation = new ForceEquation(f, m, a);
    const answer = forceEquation.solve();
    (document.getElementById("answer3") as HTMLElement).innerHTML = answer;
    forceEquation.plotGraph();
 }
 
 
 function solveFourthEquation() {
    const m = parseFloat((document.getElementById("m4") as HTMLInputElement).value) || null;
    const v = parseFloat((document.getElementById("v4") as HTMLInputElement).value) || null;
    const ke = parseFloat((document.getElementById("ke4") as HTMLInputElement).value) || null;
 
 
    const kineticEnergyEquation = new KineticEnergyEquation(m, v, ke);
    const answer = kineticEnergyEquation.solve();
    (document.getElementById("answer4") as HTMLElement).innerHTML = answer;
    kineticEnergyEquation.plotGraph();
 }
 
 
 function solveFifthEquation() {
    const m = parseFloat((document.getElementById("m5") as HTMLInputElement).value) || null;
    const g = parseFloat((document.getElementById("g5") as HTMLInputElement).value) || null;
    const h = parseFloat((document.getElementById("h5") as HTMLInputElement).value) || null;
    const pe = parseFloat((document.getElementById("pe5") as HTMLInputElement).value) || null;
 
 
    const potentialEnergyEquation = new PotentialEnergyEquation(m, g, h, pe);
    const answer = potentialEnergyEquation.solve();
    (document.getElementById("answer5") as HTMLElement).innerHTML = answer;
    potentialEnergyEquation.plotGraph();
 }
 