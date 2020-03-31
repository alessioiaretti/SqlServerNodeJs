
export class Unit
{
  Unit : string;
  Cost : string;
  Hit_Speed: string;

  constructor(public unit: string, public cost: string, public hit_Speed: string) {
    this.Unit = unit;
    this.Cost = cost;
    this.Hit_Speed = hit_Speed;
	}
}

