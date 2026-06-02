# -*- coding: utf-8 -*-
"""AiXiom Education — logo concepts, v2.
Modern / futuristic. Theme: dark navy + black + white, one electric-blue accent.
Minimal monoline + negative-space construction (Linear/Vercel/Arc vibe).
Drawn at high supersample then downscaled for crisp edges.
"""
import os, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(__file__)
SS = 5  # supersample
F_BOLD = "C:/Windows/Fonts/msyhbd.ttc"

# ---- palette: black / dark-navy / white + ONE electric-blue accent ----
INK0=(6,9,18); INK1=(11,16,34); INK2=(16,24,52)      # near-black navy tile
WHITE=(238,243,255)
BLUE=(56,170,255)        # electric accent
BLUE_DIM=(40,110,190)

def navy_tile(w,h):
    """Near-black navy tile with a faint top-left blue light. Very subtle."""
    ys,xs=np.mgrid[0:h,0:w]
    t=((xs/w)+(ys/h))/2.0
    c0=np.array(INK0); c1=np.array(INK1); c2=np.array(INK2)
    base=np.where(t[...,None]<0.5,c0+(c1-c0)*(t[...,None]/0.5),
                  c1+(c2-c1)*((t[...,None]-0.5)/0.5)).astype(float)
    d=np.sqrt((xs-0.22*w)**2+(ys-0.16*h)**2); f=np.clip(1-d/(0.85*w),0,1)**2.2
    for i in range(3): base[...,i]+=BLUE[i]*0.10*f
    return Image.fromarray(np.clip(base,0,255).astype(np.uint8),"RGB").convert("RGBA")

def L(w,h): return Image.new("L",(w,h),0)
def stroke(d, pts, width, fill=255, closed=False):
    """Polyline with round caps/joins."""
    seq=pts+([pts[0]] if closed else [])
    d.line(seq, fill=fill, width=int(width), joint="curve")
    r=width/2
    for (x,y) in seq:
        d.ellipse((x-r,y-r,x+r,y+r), fill=fill)

def paint(size, mask, color, glow=0.0):
    """Color a mask; optional soft glow halo of same color."""
    w,h=size; out=Image.new("RGBA",(w,h),(0,0,0,0))
    out.paste(color+(255,),(0,0),mask)
    if glow>0:
        gl=out.filter(ImageFilter.GaussianBlur(int(6*SS*glow)))
        gl.putalpha(gl.getchannel("A").point(lambda a:int(a*0.6*glow)))
        base=Image.new("RGBA",(w,h),(0,0,0,0))
        base=Image.alpha_composite(base,gl)
        return Image.alpha_composite(base,out)
    return out

# ---------- 1 : Negative-space A in rounded square (app-icon) ----------
def concept_1(D):
    """Deep-navy rounded tile, white chevron-A as NEGATIVE space, thin blue underline."""
    tile=L(D,D); td=ImageDraw.Draw(tile)
    pad=D*0.10; td.rounded_rectangle((pad,pad,D-pad,D-pad),radius=D*0.22,fill=255)
    # navy fill for the tile (slightly lifted from bg so the chip is visible)
    fill=Image.new("RGBA",(D,D),(0,0,0,0))
    nv=navy_tile(D,D)
    # lift brightness a touch
    arr=np.asarray(nv).astype(float); arr[...,:3]=np.clip(arr[...,:3]*1.35+8,0,255)
    nv=Image.fromarray(arr.astype(np.uint8),"RGBA")
    fill.paste(nv,(0,0),tile)
    # thin blue rim
    rim=L(D,D); ImageDraw.Draw(rim).rounded_rectangle((pad,pad,D-pad,D-pad),radius=D*0.22,outline=255,width=int(D*0.006))
    fill=Image.alpha_composite(fill,paint((D,D),rim,BLUE,glow=0.5))
    # carve the A (negative space) out of the tile
    a=L(D,D); ad=ImageDraw.Draw(a)
    cx=D/2; top=D*0.30; bot=D*0.72; hw=D*0.165; th=D*0.058
    stroke(ad,[(cx-hw,bot),(cx,top),(cx+hw,bot)],th)         # /\
    ad.line((cx-hw*0.52,bot-(bot-top)*0.30,cx+hw*0.52,bot-(bot-top)*0.30),fill=255,width=int(th)) # crossbar
    # subtract A from fill alpha
    cur=fill.getchannel("A"); newa=Image.composite(L(D,D),cur,a)
    fill.putalpha(newa)
    # blue accent: a short underline beneath the A
    ul=L(D,D); ImageDraw.Draw(ul).rounded_rectangle((cx-hw*0.75,bot+D*0.055,cx+hw*0.75,bot+D*0.055+th*0.5),radius=th*0.25,fill=255)
    return Image.alpha_composite(fill,paint((D,D),ul,BLUE,glow=0.6))

# ---------- 2 : Monoline auk (single continuous line) ----------
def concept_2(D):
    """The AiXiom bird as one clean white line; single electric-blue eye."""
    m=L(D,D); d=ImageDraw.Draw(m); w=D*0.05
    cx,cy=D*0.50,D*0.46; R=D*0.26
    # head arc (open at the lower-left for the beak), drawn as polyline around circle
    pts=[]
    for deg in range(-35,290,5):
        a=math.radians(deg); pts.append((cx+R*math.cos(a),cy+R*math.sin(a)))
    # crown notch (feather tuft) near top-right
    stroke(d,pts,w)
    # beak: sharp wedge line from head down-left
    bx,by=cx+R*math.cos(math.radians(290-360)), cy+R*math.sin(math.radians(-70))
    p0=(cx-R*0.10,cy+R*0.78)
    stroke(d,[(cx+R*0.28,cy+R*0.62),(cx-R*0.62,cy+R*1.06),(cx-R*0.02,cy+R*0.70)],w*0.85,closed=True)
    # tuft
    stroke(d,[(cx+R*0.78,cy-R*0.55),(cx+R*1.18,cy-R*0.95)],w*0.8)
    res=paint((D,D),m,WHITE,glow=0.35)
    # eye node (blue)
    eye=L(D,D); ex,ey=cx-D*0.02,cy-D*0.02; er=D*0.030
    ImageDraw.Draw(eye).ellipse((ex-er,ey-er,ex+er,ey+er),fill=255)
    return Image.alpha_composite(res,paint((D,D),eye,BLUE,glow=0.7))

# ---------- 3 : Monoline AX ligature ----------
def concept_3(D):
    """Precise monoline 'A' whose right leg becomes an 'X' — clever, minimal."""
    m=L(D,D); d=ImageDraw.Draw(m); w=D*0.052
    cx=D/2; top=D*0.24; bot=D*0.76; hw=D*0.20
    # A
    stroke(d,[(cx-hw,bot),(cx,top),(cx+hw*0.55,bot)],w)
    d.line((cx-hw*0.45,(top+bot)/2+D*0.02,cx+hw*0.12,(top+bot)/2+D*0.02),fill=255,width=int(w))
    white=paint((D,D),m,WHITE,glow=0.35)
    # X accent stroke (blue) crossing the right leg
    mx=L(D,D); dx=ImageDraw.Draw(mx)
    stroke(dx,[(cx-hw*0.02,top+D*0.10),(cx+hw,bot)],w)   # blue diagonal forming X with A's right leg
    blue=paint((D,D),mx,BLUE,glow=0.6)
    return Image.alpha_composite(white,blue)

# ---------- 4 : Ascending chevrons (signal / rising) ----------
def concept_4(D):
    """Three nested upward chevrons — progress / ascent; white→blue accent top."""
    base=Image.new("RGBA",(D,D),(0,0,0,0))
    cx=D/2; w=D*0.072
    rows=[(D*0.62,D*0.30,WHITE,0.0),(D*0.50,D*0.24,WHITE,0.0),(D*0.38,D*0.18,BLUE,0.6)]
    for (yb,hw,col,gl) in rows:
        m=L(D,D); d=ImageDraw.Draw(m)
        stroke(d,[(cx-hw,yb),(cx,yb-hw*0.95),(cx+hw,yb)],w)
        base=Image.alpha_composite(base,paint((D,D),m,col,glow=gl))
    return base

def wordmark(D, accent_x=True):
    """'AiXiom' — white, with the 'X' (and i-dot) in electric blue."""
    w,h=int(D*3.4),D
    f=ImageFont.truetype(F_BOLD,int(D*0.52),index=0)
    s="AiXiom"; d0=ImageDraw.Draw(L(2,2))
    bb=d0.textbbox((0,0),s,font=f); tw=bb[2]-bb[0]
    tx=(w-tw)/2-bb[0]; ty=(h-(bb[3]-bb[1]))/2-bb[1]
    white_m=L(w,h); ImageDraw.Draw(white_m).text((tx,ty),s,font=f,fill=255)
    out=paint((w,h),white_m,WHITE,glow=0.0)
    if accent_x:
        pre=d0.textlength("Ai",font=f); xw=d0.textlength("X",font=f)
        box=L(w,h); ImageDraw.Draw(box).rectangle((tx+pre,0,tx+pre+xw,h),fill=255)
        xm=Image.composite(white_m,L(w,h),box)
        out=Image.alpha_composite(out,paint((w,h),xm,BLUE,glow=0.4))
    return out

CONCEPTS=[("1 · Negative-space A",concept_1),("2 · Monoline Auk",concept_2),
          ("3 · AX Ligature",concept_3),("4 · Ascend Chevrons",concept_4)]

def render_all():
    D=480*SS
    for name,fn in CONCEPTS:
        big=fn(D); small=big.resize((480,480),Image.LANCZOS)
        key=name.split("·")[0].strip()
        small.save(os.path.join(ROOT,f"mark_{key}_transparent.png"))
        tile=Image.alpha_composite(navy_tile(480,480),small)
        tile.convert("RGB").save(os.path.join(ROOT,f"mark_{key}_dark.png"))
    wm=wordmark(160*SS).resize((544,160),Image.LANCZOS)
    wm.save(os.path.join(ROOT,"wordmark_transparent.png"))

    pad=40; cell=480; cols=2
    sw=cols*cell+(cols+1)*pad; sh=2*cell+3*pad+360
    sheet=navy_tile(sw,sh); d=ImageDraw.Draw(sheet)
    tf=ImageFont.truetype(F_BOLD,44,index=0); lf=ImageFont.truetype(F_BOLD,30,index=0)
    d.text((pad,28),"AiXiom — Logo Concepts v2",font=tf,fill=WHITE+(255,))
    marks={n:fn(D).resize((480,480),Image.LANCZOS) for n,fn in CONCEPTS}
    y0=120
    for i,(name,_) in enumerate(CONCEPTS):
        r,c=divmod(i,cols); x=pad+c*(cell+pad); y=y0+r*(cell+pad)
        card=Image.new("RGBA",sheet.size,(0,0,0,0))
        ImageDraw.Draw(card).rounded_rectangle((x,y,x+cell,y+cell),radius=36,
            fill=(255,255,255,12),outline=(255,255,255,38),width=3)
        sheet.alpha_composite(card); sheet.alpha_composite(marks[name],(x,y))
        wlen=d.textlength(name,font=lf); d.text((x+(cell-wlen)/2,y+cell-44),name,font=lf,fill=(170,190,225,255))
    wy=y0+2*(cell+pad)+10
    strip=Image.new("RGBA",sheet.size,(0,0,0,0))
    ImageDraw.Draw(strip).rounded_rectangle((pad,wy,sw-pad,wy+300),radius=36,
        fill=(255,255,255,12),outline=(255,255,255,38),width=3)
    sheet.alpha_composite(strip)
    wmw=wordmark(150*SS).resize((950,300),Image.LANCZOS)
    sheet.alpha_composite(wmw,((sw-950)//2,wy))
    sheet.convert("RGB").save(os.path.join(ROOT,"_contact_sheet.png"))
    print("saved", ROOT)

if __name__=="__main__":
    render_all(); print("DONE")
